# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Build Nuxt สำหรับ Production
RUN npm run build

# Stage 2: Run
FROM node:20-alpine
WORKDIR /app

# Copy ไฟล์ที่ Build เสร็จแล้วจาก Stage ก่อนหน้า
COPY --from=builder /app/.output ./.output
# หรือถ้าเป็น Nuxt 2 อาจจะต้อง copy โฟลเดอร์ .nuxt และ static แทน
# COPY --from=builder /app/.nuxt ./.nuxt
# COPY --from=builder /app/static ./static

COPY package*.json ./
# Install production dependencies only (เพื่อให้ image เล็ก)
RUN npm install --production

# ตั้งค่า Environment ให้เป็น Production
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

# คำสั่งรัน Nuxt (Nuxt 3 ใช้ script นี้ ส่วน Nuxt 2 ใช้ npm run start)
CMD ["node", ".output/server/index.mjs"] 
# หมายเหตุ: หากเป็น Nuxt 2 ให้เปลี่ยนบรรทัดบนเป็น CMD ["npm", "run", "start"]