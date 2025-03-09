const EnvVar = require('./mongodbenv');
const readEnv = async () => {
    try {
        const envVars = await EnvVar.find({});
        const envVarObject = {};
        envVars.forEach(envVar => {
            envVarObject[envVar.key] = envVar.value;
        });
        return envVarObject;
    } catch (err) {
        console.error('Error retrieving environment variables:' + err.message);
        throw err;
    }
};

const updateEnv = async (key, newValue) => {
    try {
        const result = await EnvVar.findOneAndUpdate(
            { key: key },
            { value: newValue },
            { new: true, upsert: true }
        );

        if (result) {
            console.log(`Updated ${key} to ${newValue}`);
        } else {
            console.log(`Environment variable ${key} not found`);
        }
    } catch (err) {
        console.error('Error updating environment variable:' + err.message);
        throw err;
    }
};

module.exports = {
    readEnv,
    updateEnv
};
