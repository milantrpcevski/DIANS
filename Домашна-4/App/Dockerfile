# Користење на официјален Node.js runtime како почетна слика
FROM node:14

# Поставување на работен директориум во докер контејнерот
WORKDIR /app

# Копирање на package.json и package-lock.json во контејнерот
COPY package*.json ./

# Инсталирање на потребните команди
RUN npm install

# Копирање на остатокот од аплиакцијата во контејнерот
COPY . .

# Користење на порта
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
