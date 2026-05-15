<h1 align="center">StageConnect 🎓</h1>

<p align="center">
StageConnect is a modern internship management platform designed to simplify the connection between students and companies.  
The platform allows students to explore internship opportunities, apply online, and track their applications in real time, while companies can publish offers, manage applications, and find suitable candidates through an intuitive and user-friendly dashboard.
</p>

---
<h1 align="center">🚀 Features 🎓</h1>

## 👨‍🎓 Stagiaire
- Account registration & login
- Browse internship offers
- Apply to internships
- Track application status
- Personal dashboard
- Profile management

## 🏢 Entreprise
- Company registration
- Publish internship offers
- Manage offers
- View applications
- Company dashboard
- Profile management

## 🔐 Authentication
- Secure authentication system
- Forgot password / reset password
- Role-based access (stagiaire / entreprise)

---

<h2 align="center">🛠️ Tech Stack</h2>

<table align="center">
    <tr>
        <th>Layer</th>
        <th>Technology</th>
    </tr>
    <tr>
        <td>Backend</td>
        <td>Laravel 13</td>
    </tr>
    <tr>
        <td>Frontend</td>
        <td>React + Inertia.js</td>
    </tr>
    <tr>
        <td>Database</td>
        <td>MySQL</td>
    </tr>
    <tr>
        <td>Styling</td>
        <td>Tailwind CSS</td>
    </tr>
    <tr>
        <td>Build Tool</td>
        <td>Vite</td>
    </tr>
    <tr>
        <td>Authentication</td>
        <td>Laravel Breeze</td>
    </tr>
</table>

# <h2 align="center">📦 Packages & Libraries</h2>
```bash
@inertiajs/react
react
tailwindcss
axios
laravel/breeze
```
---
<h2 align="center">📊 Dashboards</h2>

### 👨‍🎓 Stagiaire Dashboard
- Applications statistics
- Recent applications
- Available internships

### 🏢 Entreprise Dashboard
- Internship offers management
- Applications overview
- Company statistics
---

# <h2 align="center">⚙️ Installation</h2>

```bash
# Clone the repository
git clone https://github.com/mohamedechaara/stage-connect.git

# Move into the project folder
cd stage-connect

# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database credentials inside .env file
# DB_DATABASE=stage_connect
# DB_USERNAME=root
# DB_PASSWORD=

# Run database migrations
php artisan migrate

# Start Laravel development server
php artisan serve

# Start Vite development server
npm run dev
```
        
