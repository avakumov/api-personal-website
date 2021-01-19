const mongoose = require("mongoose")
const Note = require("../models/Note")
const User = require("../models/User")
const Tag = require("../models/Tag")

const main = async () => {
  mongoose.connect("mongodb://localhost/personal-website", {
    useNewUrlParser: true,
    //autoIndex: false,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  const collections = Object.keys(mongoose.connection.collections)
  console.log("collections: ", collections)

  const user = await User.findOne({ email: "avakdev@gmail.com" })
  console.log("find user:", user)

  const res = await Tag.updateMany({}, { owner: user._id })
  console.log("Documents matched: ", res.n)
  console.log("Documents modified: ", res.nModified)

  const res2 = await Note.updateMany({}, { owner: user._id })
  console.log("Documents matched: ", res2.n)
  console.log("Documents modified: ", res2.nModified)
}

main()
