async function main() {
    const FORESTART = await ethers.getContractFactory("FORESTART")
  
    // Start deployment, returning a promise that resolves to a contract object
    const FORESTART_CONTRACT = await FORESTART.deploy()
    console.log("Contract deployed to address:", FORESTART_CONTRACT.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  