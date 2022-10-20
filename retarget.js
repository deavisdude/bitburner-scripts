var servers = []
findServers("home")

//Recursively cracks and adds servers (ignores those we can't nuke)
function findServers(root){
	print("finding servers for ", root)
	var newServers = scan(root)
	for(j in newServers){
		if(!servers.includes(newServers[j]) && getServerMaxRam(newServers[j]) > 2.4){
			if(!hasRootAccess(newServers[j])){
				switch(getServerNumPortsRequired(newServers[j])){
					case 0:
						nuke(newServers[j])
						servers.push(newServers[j])
						findServers(newServers[j])
						break;
					case 1:
						brutessh(newServers[j])
						nuke(newServers[j])
						servers.push(newServers[j])
						findServers(newServers[j])
						break;
					case 2:
						brutessh(newServers[j])
						ftpcrack(newServers[j])
						nuke(newServers[j])
						servers.push(newServers[j])
						findServers(newServers[j])
						break;
					case 3:
						brutessh(newServers[j])
						ftpcrack(newServers[j])
						relaysmtp(newServers[j])
						nuke(newServers[j])
						servers.push(newServers[j])
						findServers(newServers[j])
						break;
					default:
						print(newServers[j]," too powerful for us right now")
				}
			}else{
				servers.push(newServers[j])
				findServers(newServers[j])
			}
		}
	}
}

//Get the target
var highestLevel = "n00dles"
for(i in servers){
	if (getServerMaxMoney(servers[i]) > getServerMaxMoney(highestLevel) && 
		getServerRequiredHackingLevel(servers[i]) < getHackingLevel()){
		highestLevel = servers[i]
	}
}


for(i in servers){
	killall(servers[i])
	threads = Math.floor(getServerMaxRam(servers[i]) / 2.4)
	scp("basic-hack.script", servers[i])
	exec("basic-hack.script", servers[i], threads, highestLevel)
}
