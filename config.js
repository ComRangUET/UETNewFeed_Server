const mysql = require('mysql');
const Sequelize = require('sequelize');

const con = new Sequelize('qldv', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

/* const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qldv1'
});

conn.connect(function(err) {
    // in case of error
    if (err) {
        console.log(err.code);
        console.log(err.fatal);
    } else {
        console.log('connected!');
    }
}); */



//Sequelize connect



const account = con.define('account', {
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
    faculty: {
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
    });

const event = con.define('event', {
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
    })

const news = con.define('news', {
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
    })

const register = con.define('students_register_event', {
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
    })
register.belongsTo(account, { foreignKey: 'id_stu'});
register.belongsTo(event, {foreignKey: 'id_eve'})
//module.exports = conn;

con
    .authenticate()
    .then(function () {
        console.log('Connected!');
    })
    .catch(function (err) {
        console.log(err);
    })

con.sync();
module.exports = {
    account,
    register,
    event,
    news
};