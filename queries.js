const Pool = require('pg').Pool
const jwt = require("jsonwebtoken");


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'management_student',
    password: '030300',
    port: 5432,
})

const login = (req, res, next) => {
    let { email, password } = req.body;
    let token;
    try {
        token = jwt.sign(
            { email },
            'PRIV_123',
            { expiresIn: "1h" }
        )
    } catch (err) {
        console.log(err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }

    res.status(200).json({
        success: true,
        data: {
            email: email,
            token: token,
        },
    })
}

const getAllStudent = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    pool.query('SELECT * FROM student ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getStudentByTeacher = (req, res) => {
    const id_teacher = parseInt(req.params.id_teacher)
    pool.query(`SELECT * FROM student WHERE id_teacher = '${id_teacher}' ORDER BY id ASC`, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getAllStudent,
    getStudentByTeacher,
    login
}