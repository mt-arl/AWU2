const pool = require('../config/db');
const bcrypt = require('bcrypt');

const rolesController = {
       // Create new user
       
    // Get all users
    getAllRoles: async (req, res) => {
        try {
            const [roles] = await pool.query('SELECT id_rol, roles FROM roles');
            res.json(roles);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    },

    // Get user by ID
    getUserById: async (req, res) => {
        try {
            const [user] = await pool.query(
                'SELECT id_rol, roles FROM roles WHERE id = ?',
                [req.params.id]
            );

            if (user.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error: error.message });
        }
    },

 

    // Update user
    updateUser: async (req, res) => {
        try {
            const { cedula, first_name, last_name, address, phone, email, gender, id_rol } = req.body;
            const userId = req.params.id;

            // Check if user exists
            const [existingUser] = await pool.query('SELECT id FROM users WHERE id = ?', [userId]);

            if (existingUser.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if email or cedula is already used by another user
            const [duplicateCheck] = await pool.query(
                'SELECT id FROM users WHERE (email = ? OR cedula = ?) AND id != ?',
                [email, cedula, userId]
            );

            if (duplicateCheck.length > 0) {
                return res.status(400).json({ message: 'Email or cedula already in use by another user' });
            }

            await pool.query(
                'UPDATE users SET cedula = ?, first_name = ?, last_name = ?, address = ?, phone = ?, email = ?, gender = ?, id_rol = ? WHERE id = ?',
                [cedula, first_name, last_name, address, phone, email, gender, id_rol, userId]
            );

            res.json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    },

    // Delete user
    deleteUser: async (req, res) => {
        try {
            const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    },

    // Update password
    updatePassword: async (req, res) => {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.params.id;

            // Get current user
            const [user] = await pool.query('SELECT password FROM users WHERE id = ?', [userId]);

            if (user.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verify current password
            const isValid = await bcrypt.compare(currentPassword, user[0].password);

            if (!isValid) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);

            res.json({ message: 'Password updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating password', error: error.message });
        }
    }
};

module.exports = rolesController;