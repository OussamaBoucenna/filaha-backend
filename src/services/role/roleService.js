const  Role  = require('../../models/Role/Role');
const User = require('../../models/User/User');

// Create a new role
const createRole = async (roleName) => {
  try {
    const role = await Role.create({ roleName });
    return role;
  } catch (error) {
    throw new Error('Error creating role');
  }
};

// Update a role by its ID
const updateRole = async (id, roleName) => {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error('Role not found');
      }
      role.roleName = roleName;
      await role.save();
      return role;
    } catch (error) {
      throw new Error(error.message || 'Error updating role');
    }
  };

  // Delete a role by its ID
const deleteRole = async (id) => {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error('Role not found');
      }
      await role.destroy();
      return role;
    } catch (error) {
      throw new Error(error.message || 'Error deleting role');
    }
  };

  // Get all roles
const getRoles = async () => {
    try {
      const roles = await Role.findAll();
      return roles;
    } catch (error) {
      throw new Error('Error fetching roles');
    }
  };

const getMyRole = async (userId) => {

  try {
    const userRoles = await User.findByPk(userId, {
      include: [{
        model: Role,
        attributes: ['roleName']
      }]
    });
    
    // Pour obtenir uniquement les noms de rôles
    return userRoles.Role.roleName;
    
  } catch (error) {
    console.error('Erreur lors de la récupération des rôles:', error);
    throw error;
  }
}


  module.exports = {
    createRole,
    updateRole,
    deleteRole,
    getRoles,
    getMyRole
  };