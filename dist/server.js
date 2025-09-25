const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const { sequelize, User, Order } = require('../models');

const app = express();

// Middleware - Simplified CORS for Vercel
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('.', {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Using Sequelize models instead of in-memory arrays

// Simple authentication middleware using JWT-like tokens
function generateToken(userId) {
    return Buffer.from(JSON.stringify({ userId, timestamp: Date.now() })).toString('base64');
}

function verifyToken(token) {
    try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
        // Token never expires - permanent session
        return decoded.userId;
    } catch (error) {
        return null;
    }
}

// Authentication middleware
function requireAuth(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '') || 
                  req.body.token || 
                  req.query.token;
    
    console.log('Auth token received:', token ? 'Yes' : 'No');
    
    if (token) {
        const userId = verifyToken(token);
        console.log('Token verified, userId:', userId);
        if (userId) {
            req.userId = userId;
            return next();
        }
    }
    console.log('Authentication failed');
    res.status(401).json({ error: 'Authentication required' });
}

// Initialize database and sync models
async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Database connected and synced');
    } catch (err) {
        console.error('Database initialization error:', err);
    }
}


// Routes

// Health check endpoint for Vercel
app.get('/api/health', async (req, res) => {
    try {
        const usersCount = await User.count();
        const ordersCount = await Order.count();
        res.json({ 
            status: 'OK', 
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
            users: usersCount,
            orders: ordersCount
        });
    } catch (e) {
        res.json({ status: 'DEGRADED', error: e.message });
    }
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'auth.html'));
});

app.get('/auth.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'auth.html'));
});

app.get('/products.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'products.html'));
});

app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve CSS and JS files with proper headers
app.get('/styles.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/script.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.get('/languages.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(__dirname, 'languages.js'));
});

// Handle all static files
app.get('*.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(__dirname, req.path));
});

app.get('*.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(__dirname, req.path));
});

app.get('*.png', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(__dirname, req.path));
});

app.get('*.jpg', (req, res) => {
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(__dirname, req.path));
});

app.get('*.jpeg', (req, res) => {
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(__dirname, req.path));
});

app.get('*.gif', (req, res) => {
    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(__dirname, req.path));
});

app.get('*.svg', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(__dirname, req.path));
});

app.get('*.ico', (req, res) => {
    res.setHeader('Content-Type', 'image/x-icon');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(__dirname, req.path));
});

// User registration
app.post('/api/register', async (req, res) => {
    try {
        console.log('Registration request received:', req.body);
        
        const {
            firstName, lastName, phone,
            street, houseNumber, apartment, postalCode, city, state
        } = req.body;

        // Basic validation
        if (!firstName || !lastName || !phone || !street || !houseNumber || !postalCode || !city || !state) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }

        // Check if user already exists by phone
        const existingUser = await User.findOne({ where: { phone } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this phone number' });
        }

        // Create user
        const newUser = await User.create({
            firstName: firstName || '',
            lastName: lastName || '',
            phone: phone || '',
            street: street || '',
            houseNumber: houseNumber || '',
            apartment: apartment || '',
            postalCode: postalCode || '',
            city: city || '',
            state: state || '',
            country: 'Deutschland'
        });
        console.log('User created successfully:', newUser.id);

        // Generate permanent token (never expires)
        const token = generateToken(newUser.id);

        res.json({ 
            success: true, 
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                phone: newUser.phone,
                street: newUser.street,
                houseNumber: newUser.houseNumber,
                apartment: newUser.apartment,
                postalCode: newUser.postalCode,
                city: newUser.city,
                state: newUser.state,
                country: newUser.country
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
});


// User logout
app.post('/api/logout', (req, res) => {
    res.json({ success: true, message: 'Logged out successfully' });
});

// Get current user
app.get('/api/user', requireAuth, async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            birthDate: user.birthDate,
            street: user.street,
            houseNumber: user.houseNumber,
            apartment: user.apartment,
            postalCode: user.postalCode,
            city: user.city,
            state: user.state,
            country: user.country,
            newsletter: user.newsletter
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Check authentication status
app.get('/api/auth/status', (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
        const userId = verifyToken(token);
        if (userId) {
            return res.json({ authenticated: true, userId });
        }
    }
    res.json({ authenticated: false });
});

// Create order (simple bread order) - with flexible auth for Vercel
app.post('/api/orders', async (req, res) => {
    try {
        const { quantity, totalPrice, userId, userData } = req.body;
        
        console.log('Order creation request:', { quantity, totalPrice, userId, userData });
        
        let user;
        let finalUserId;
        
        // Try to get user from token first
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (token) {
            const tokenUserId = verifyToken(token);
            if (tokenUserId) {
                user = await User.findByPk(tokenUserId);
                finalUserId = tokenUserId;
                console.log('User found via token:', user);
            }
        }
        
        // If no user found via token, try to use provided userData
        if (!user && userData) {
            // Find user by phone number from userData
            user = await User.findOne({ where: { phone: userData.phone } });
            if (user) {
                finalUserId = user.id;
                console.log('User found via userData:', user);
            }
        }
        
        // If still no user, try userId from request body
        if (!user && userId) {
            user = await User.findByPk(userId);
            finalUserId = userId;
            console.log('User found via userId:', user);
        }
        
        if (!user) {
            console.log('No user found. Available users:', users.map(u => ({ id: u.id, phone: u.phone, name: u.firstName + ' ' + u.lastName })));
            return res.status(404).json({ error: 'User not found' });
        }

        const newOrder = await Order.create({
            userId: finalUserId,
            productName: 'Traditionelles Barbari-Brot',
            quantity: quantity || 1,
            totalPrice: totalPrice || 3.50,
            totalAmount: totalPrice || 3.50,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            street: user.street,
            houseNumber: user.houseNumber,
            apartment: user.apartment,
            postalCode: user.postalCode,
            city: user.city,
            state: user.state,
            status: 'confirmed'
        });
        console.log('Order created successfully:', newOrder.id);

        res.json({ 
            success: true, 
            message: 'Order created successfully',
            orderId: newOrder.id 
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Failed to create order: ' + error.message });
    }
});

// Get user orders - flexible auth for Vercel
app.get('/api/orders', async (req, res) => {
    try {
        let user = null;
        let userId = null;
        
        // Try to get user from token
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (token) {
            userId = verifyToken(token);
            if (userId) {
                user = await User.findByPk(userId);
            }
        }
        
        // If no user found via token, try to get from query params
        if (!user && req.query.userId) {
            userId = parseInt(req.query.userId);
            user = await User.findByPk(userId);
        }
        
        console.log('Get orders request - user:', user, 'userId:', userId);
        
        if (!user) {
            // Return all orders for admin panel (no specific user)
            const allOrders = await Order.findAll({ order: [['createdAt', 'DESC']] });
            res.json({ success: true, orders: allOrders });
            return;
        }
        
        // Check if user is admin (Azizollah Payandeh - both English and Persian)
        if ((user.firstName === 'Azizollah' && user.lastName === 'Payandeh') || 
            (user.firstName === 'عزیزالله' && user.lastName === 'پاینده')) {
            const allOrders = await Order.findAll({ order: [['createdAt', 'DESC']] });
            res.json({ success: true, orders: allOrders });
        } else {
            const userOrders = await Order.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
            res.json({ success: true, orders: userOrders });
        }
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
});

// Admin endpoint to view database (without strict auth for now)
app.get('/api/admin/database', async (req, res) => {
    try {
        const users = await User.findAll();
        const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
        res.json({ success: true, users, orders, totalUsers: users.length, totalOrders: orders.length });
    } catch (error) {
        console.error('Database view error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Alternative admin endpoint with proper auth
app.get('/api/admin/database/secure', requireAuth, async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);
        
        // Check if user is admin
        if (user && ((user.firstName === 'Azizollah' && user.lastName === 'Payandeh') || 
                     (user.firstName === 'عزیزالله' && user.lastName === 'پاینده'))) {
            const users = await User.findAll();
            const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
            res.json({ success: true, users, orders, totalUsers: users.length, totalOrders: orders.length });
        } else {
            res.status(403).json({ error: 'Access denied. Admin privileges required.' });
        }
    } catch (error) {
        console.error('Database view error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Mark order as delivered
app.post('/api/admin/mark-delivered', async (req, res) => {
    try {
        const { orderId } = req.body;
        
        console.log('Marking order as delivered:', orderId);
        
        const order = await Order.findByPk(parseInt(orderId));
        if (!order) return res.status(404).json({ error: 'Order not found' });
        await order.update({ status: 'delivered', deliveredAt: new Date() });
        res.json({ success: true, message: 'Order marked as delivered successfully' });
    } catch (error) {
        console.error('Mark delivered error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Initialize DB
initializeDatabase();

// Export for Vercel
module.exports = app;

// Start server (only in development)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
