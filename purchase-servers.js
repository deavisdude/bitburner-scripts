// How much RAM each purchased server will have. In this case, it'll
// be 8GB.
var ram = 4096;

// Iterator we'll use for our loop
var i = getPurchasedServers().length;

// Continuously try to purchase servers until we've reached the maximum
// amount of servers
while (i < getPurchasedServerLimit() && getServerMoneyAvailable("home") > getPurchasedServerCost(ram)) {
    // If we have enough money, then:
    //  1. Purchase the server
    //  2. Copy our hacking script onto the newly-purchased server
    //  3. Run our hacking script on the newly-purchased server with 3 threads
    //  4. Increment our iterator to indicate that we've bought a new server
    var hostname = purchaseServer("pserv-" + (i), ram);
    scp("basic-hack.script", hostname);
    threads = Math.floor(getServerMaxRam(hostname) / 2.4)
    exec("basic-hack.script", hostname, threads, "the-hub")
    ++i;
}

var pservs = getPurchasedServers()
for(i in getPurchasedServers()){
    if (getServerMoneyAvailable("home") > getPurchasedServerCost(ram) &&
        getServerMaxRam(pservs[i]) != ram){
        killall(pservs[i])
        deleteServer(pservs[i])
        purchaseServer(pservs[i], ram)
        threads = Math.floor(getServerMaxRam(pservs[i]) / 2.4)
        scp("basic-hack.script", pservs[i])
        exec("basic-hack.script", pservs[i], threads, "the-hub")
    }
   
}
