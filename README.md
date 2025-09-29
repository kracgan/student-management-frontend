# Student Management System - Frontend

A modern, responsive React frontend for the Student Management System with role-based access control, featuring both student portal and comprehensive admin panel.

## 🚀 Features

### Student Portal
- **Personal Dashboard**: Academic overview with GPA tracking and course progress
- **Subject Enrollment**: Browse and enroll in available subjects with real-time validation
- **Profile Management**: Update personal information and contact details
- **Academic Progress**: Track grades, credits, and degree completion
- **Digital ID Card**: Student identification with QR code
- **Schedule View**: Calendar-based class schedule

### Admin Panel
- **System Dashboard**: Comprehensive analytics and KPIs with interactive charts
- **Student Management**: Full CRUD operations with advanced search and filtering
- **Department Management**: Academic department setup and configuration
- **Subject Management**: Curriculum and course management
- **Enrollment Oversight**: Monitor and manage all student enrollments
- **User Administration**: System user management and permissions
- **Analytics & Reports**: Data visualization and system insights

### Technical Features
- **Role-based Access Control**: Secure authentication and authorization
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Live data synchronization with backend
- **Interactive Visualizations**: Charts and graphs using ECharts.js
- **Smooth Animations**: Enhanced user experience with Anime.js
- **Modern UI**: Clean, professional interface with Tailwind CSS

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and concurrent features
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing with protected routes
- **React Query**: Data fetching, caching, and synchronization
- **Axios**: HTTP client for API communication

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **Custom Components**: Reusable UI components library

### Animation & Effects
- **Anime.js**: Smooth animations and transitions
- **ECharts.js**: Interactive data visualizations
- **Typed.js**: Typewriter effects for headings
- **Framer Motion**: Advanced animations and gestures

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing and optimization
- **Vite Dev Server**: Fast development with HMR

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Backend API running (Spring Boot application)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### API Configuration
The frontend expects the backend API to be running at `http://localhost:8080` by default. Update the `VITE_API_BASE_URL` environment variable if your backend is running on a different port or host.

### Authentication
The application uses JWT-based authentication. Ensure your backend is configured to:
- Issue JWT tokens upon successful login
- Validate tokens on protected routes
- Handle token refresh and expiration

### CORS Configuration
Configure your Spring Boot backend to accept requests from the frontend:
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

## 📱 Usage

### Demo Credentials
For testing purposes, use these demo accounts:

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Student Account:**
- Username: `student`
- Password: `student123`

### Navigation
- **Student Portal**: Access personal dashboard, subjects, and academic information
- **Admin Panel**: Full system management with comprehensive controls
- **Responsive Design**: Works seamlessly on all device sizes

## 🎨 Customization

### Theme Customization
Modify the Tailwind configuration in `tailwind.config.js` to customize:
- Color palette
- Typography
- Spacing scale
- Component styles

### Adding New Features
1. Create new components in the appropriate directory
2. Add routes in `App.jsx`
3. Implement API services in `src/services/`
4. Add state management with React Query
5. Style with Tailwind CSS classes

### Component Library
The application includes a comprehensive set of reusable components:
- `Button`: Various button styles and variants
- `Card`: Flexible card containers
- `Loading`: Loading states and skeletons
- `Form Elements`: Input fields, selects, and validation

## 🔐 Security Features

### Authentication
- JWT token-based authentication
- Automatic token refresh
- Secure storage in localStorage
- Session timeout handling

### Authorization
- Role-based route protection
- Component-level permission checks
- API access control enforcement

### Data Protection
- Input validation and sanitization
- XSS protection
- CSRF token handling
- Secure API communication

## 📊 Performance Optimization

### Code Splitting
- Route-based code splitting
- Lazy loading of components
- Optimized bundle sizes

### Caching Strategy
- React Query for data caching
- Image optimization with WebP
- Browser cache optimization

### Monitoring
- Performance metrics tracking
- Error boundary implementation
- Loading state management

## 🧪 Testing

### Unit Testing
```bash
npm test
```

### Integration Testing
```bash
npm run test:integration
```

### E2E Testing
```bash
npm run test:e2e
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFlare, AWS CloudFront
- **Container**: Docker, Kubernetes

### Environment Variables for Production
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_APP_ENV=production
```

## 📈 Development Guidelines

### Code Style
- Follow ESLint configuration
- Use TypeScript for type safety
- Implement proper error handling
- Write comprehensive tests

### Git Workflow
1. Create feature branches
2. Write descriptive commit messages
3. Submit pull requests for review
4. Ensure CI/CD passes

### Documentation
- Update README for new features
- Document API integrations
- Maintain component documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review existing issues and discussions

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Lucide for beautiful icons
- All contributors and maintainers

---

**Built with ❤️ for modern education management**