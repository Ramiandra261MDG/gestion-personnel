module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Personal', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        matricule: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: { msg: '"Matricule" must have a value.' },
                notNull: { msg: '"Matricule" must have a value.' }
            }
        },
        nom: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        prenom: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        date_embauche: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        poste: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: { msg: 'Please enter a valid email address.' }
            }
        },
        code_acces: {
            type: DataTypes.STRING(225),
            allowNull: false,
        },
        actif: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        is_admin: {
            type: DataTypes.TINYINT,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'is_admin must have a value.' },
                notNull: { msg: 'is_admin must have a value.' }
            }
        },
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: true
    })
}