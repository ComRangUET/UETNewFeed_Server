module.exports = function(sequelize, Sequelize){
    const news = sequelize.define('news', {
        id_news: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        header: {
            type: Sequelize.TEXT
        },
        introduce_news: {
            type: Sequelize.TEXT
        },
        content: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        }
    },
        {
            timestamps: false,
            freezeTableName: true
        }
    );
    return news;
}