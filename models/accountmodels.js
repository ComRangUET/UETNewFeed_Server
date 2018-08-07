module.exports = function(sequelize, Sequelize){
    const account = sequelize.define('account', {
        role_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
    
        },
        email: {
            type: Sequelize.STRING
        },
        course: {
            type: Sequelize.INTEGER
        },
        fullname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        major: {
            type: Sequelize.STRING
        },
        class_name: {
            type: Sequelize.DATE
        },
        phonenumber: {
            type: Sequelize.STRING,
        },
        MSSV: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
        {
            timestamps: false,
            freezeTableName: true
        }
    );

    return account;
}
