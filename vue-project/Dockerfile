# 1. Basis-Image mit Node.js für den Build
FROM node:18 AS build-stage
WORKDIR /app

# 2. Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# 3. Vue-Projekt bauen
COPY . .
RUN npm run build

# 4. Neues Image mit Nginx für den Build-Output
FROM nginx:alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 5. Nginx-Konfiguration für Vue Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 6. Expose Port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]