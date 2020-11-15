const Activity = require("../model/activity");

module.exports = {
  list: async (req, res) => {
    const result = await Activity.find().sort({ time: -1 });
    return res.json(result);
  },
  create: async (req, res) => {
    try {
      const { name, description } = { ...req.body };
      const activity = await new Activity({
        name,
        description,
      }).save();
      return res.status(201).json({
        success: true,
        message: "Data berhasil disimpan",
        activity,
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "Data gagal disimpan",
      });
    }
  },
  delete: async (req, res) => {
    const { id } = { ...req.params };
    Activity.findByIdAndDelete(id)
      .then((result) => {
        if (result) {
          return res.status(200).json({
            success: true,
            message: "Data berhasil dihapus",
          });
        }
        return res.status(200).json({
          success: false,
          message: "Data gagal dihapus",
        });
      })
      .catch((error) => {
        console.log("Delete Activity : ", error);
      });
  },
};
