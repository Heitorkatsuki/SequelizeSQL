require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: console.log,
  define: {
    timestamps: true,
    underscored: false,
  },
  pool: {
    max: 10, // Máximo de conexões simultâneas
    min: 0, // Mínimo de conexões
    acquire: 30000, // Tempo máximo para obter conexão (30s)
    idle: 10000,
  },
});

// Função para testar a conexão
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão com MySQL estabelecida com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar com o banco de dados:", error.message);
  }
}

testConnection();

module.exports = sequelize;