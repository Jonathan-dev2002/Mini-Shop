// Back-end\src\plugins\responseWrapperPlugin.js

const { successResponse, errorResponse } = require('../utils/responseWrapper');

exports.responseWrapperPlugin = {
  name: 'responseWrapper',
  version: '1.0.0',
  register: async (server) => {
    server.ext('onPreResponse', (request, h) => {
      const response = request.response;

      // --- Logic ที่ปรับปรุงใหม่ ---

      // 1. จัดการกับ Error ก่อนเป็นอันดับแรก
      if (response.isBoom) {
        // ถ้าเป็น Boom error ให้จัดรูปแบบด้วย errorResponse แล้วจบการทำงาน
        const err = response;
        const message = err.output.payload.message || 'Internal Error';
        const statusCode = err.output.statusCode || 500;
        return errorResponse(h, message, statusCode);
      }

      // 2. ตรวจสอบ Path ที่ต้องการ "ข้าม" การห่อข้อมูล
      const pathsToSkip = [
        /^\/documentation/,
        /^\/swaggerui/,
        /^\/health/,
        /^\/metrics/
      ];

      // .some คือการเช็คว่ามีอย่างน้อย 1 เงื่อนไขใน array ที่เป็นจริงหรือไม่
      const shouldSkip = pathsToSkip.some(regex => regex.test(request.path));

      if (shouldSkip) {
        return h.continue; // ถ้าเป็น Path ที่ต้องข้าม ก็ปล่อยผ่าน
      }

      // 3. ถ้าไม่ใช่ Error และไม่ใช่ Path ที่ต้องข้าม ก็ทำการห่อข้อมูลตามปกติ
      const contentType = response.headers && response.headers['content-type'];
      if (
        response.source != null &&
        ((contentType && contentType.includes('application/json')) ||
          typeof response.source === 'object')
      ) {
        return successResponse(h, response.source);
      }

      // 4. ถ้าไม่ใช่กรณีข้างบนทั้งหมด ก็ปล่อยผ่าน
      return h.continue;
    });
  }
};