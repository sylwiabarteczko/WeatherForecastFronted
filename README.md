# 🚀 Ready Project Setup Guide

This project is a full-stack application that fetches real-time and forecast weather data from an external Weather API and exposes REST endpoints for a frontend application.

Built with:
- **Backend**: https://github.com/sylwiabarteczko/WeatherForecast
- **Frontend**: React + TypeScript + Vite + CSS + JavaScript + HTML

## 1. Clone the Repository:

Open your terminal and clone the project:

```bash
git clone https://github.com/sylwiabarteczko/WeatherForecastFronted
```
Then open the folder in WebStorm.

## 2. 🔧 Backend Setup (Required Before Starting Frontend)

The frontend requires the backend running on:

```bash
http://localhost:8080
```
You have two options:

## Option A – Run Backend Locally (Spring Boot)

Go to the backend project directory and run:

```bash
mvn spring-boot:run
```
Backend will be available at:
```bash
http://localhost:8080
```

## Option B – Run Backend with Docker (Recommended)

1. Make sure Docker is installed and running.
2. Go to the backend project folder (where docker-compose.yml is located).
3. Run:

```bash
docker compose up -d
```
This will start:
- PostgreSQL
- Backend application (if configured in docker-compose)
If the backend service is included in Docker, you do NOT need to run mvn spring-boot:run.

## 3. 🌐 Frontend Setup

Install Dependencies:
- Inside the frontend project folder:
```bash
npm install
```
- Start the Frontend
```bash
npm run dev
```
- Open in Browser
  👉 http://localhost:3000

## 4. Full flow test

- Make sure backend is running (locally or in Docker)
- Start the frontend
- Enter a city name
- The app will fetch real-time and forecast data via REST API from the backend
