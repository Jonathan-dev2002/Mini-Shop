# ใช้ Node.js LTS (เลือก version 18 หรือ 20 ตามความเหมาะสม)
FROM node:20-alpine

# ตั้ง Working Directory
WORKDIR /app

# Copy ไฟล์ Package เพื่อ Install Dependencies ก่อน (เพื่อใช้ Cache layer)
COPY package*.json ./
COPY prisma ./prisma/

# Install Dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy Source Code ทั้งหมด
COPY . .

# เปิด Port 3000 (ตามที่ระบุใน README)
EXPOSE 3000

# คำสั่งรัน Server (เช็คว่าใน package.json มี script start หรือไม่ ถ้าไม่มีให้ใช้ node server.js)
CMD ["node", "server.js"]