module.exports = function(sequelize, Sequelize){
    const register = sequelize.define('students_register_event', {
        id_eve: {
            type: Sequelize.INTEGER
        },
        id_stu: {
            type: Sequelize.INTEGER
        },
        default_student: {
            type: Sequelize.TINYINT,
            allowNull: false,
            defaultValue: 0
        }
    },
        {
            timestamps: false,
            freezeTableName: true
        }
    );
    return register;
}