import User from '../models/user.model.js'

export const getUsers = async(req, res, next) => {
    try {
        const users = await User.find().limit(20)
        const usersWithoutPassword = users.map((user) => {
            const {password, ...rest} = user._doc;
            return rest
        })

        res.status(200).json({
            users: usersWithoutPassword,
        })
    } catch(error) {
        next(error)
    }
} 