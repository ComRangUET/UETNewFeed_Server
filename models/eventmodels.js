module.exports = function(sequelize, Sequelize){
    const event = sequelize.define('event', {
        id_eve: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        header: {
            type: Sequelize.TEXT
        },
        content: {
            type: Sequelize.TEXT
        },
        image: {
            type: Sequelize.STRING
        },
        place: {
            type: Sequelize.STRING
        },
        time_start: {
            type: Sequelize.DATE
        }
    },
        {
            timestamps: false,
            freezeTableName: true
        }
    );
    
    return event;
}
