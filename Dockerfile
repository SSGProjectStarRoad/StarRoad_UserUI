# 1. Node.js 이미지를 베이스로 사용합니다.
FROM node:16

# 2. 작업 디렉토리를 설정합니다.
WORKDIR /app

# 3. 패키지 파일을 복사하고 의존성을 설치합니다.
COPY package*.json ./
RUN npm install

# 4. 소스 파일을 복사합니다.
COPY . .

# 5. 프로젝트를 빌드합니다.
RUN npm run build

# 6. serve 패키지를 설치합니다.
RUN npm install -g serve

# 7. 빌드된 파일을 서빙하는 명령을 실행합니다.
CMD ["serve", "-s", "dist"]

# 8. EXPOSE 명령어를 통해 컨테이너 내부 포트를 노출합니다.
EXPOSE 3000
