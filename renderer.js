const triggerTabList = document.querySelectorAll('#nav-tab button')
    triggerTabList.forEach(triggerEl => {
      const tabTrigger = new bootstrap.Tab(triggerEl)

      triggerEl.addEventListener('click', event => {
        event.preventDefault()
        tabTrigger.show()
      })
    })

const tabs = document.getElementById("nav-tabContent");
systeminfos.cpus().then((cpus) => {
    //console.log(cpus);

    var newDiv = document.createElement("div")
    newDiv.classList = "tab-pane fade show active"
    newDiv.id = "nav-cpus"
    newDiv.role = "tabpanel"
    newDiv.tabindex = "0"
    tabs.insertAdjacentElement('afterBegin', newDiv);
    newDiv = document.getElementById('nav-cpus');
    var html = '<table class="table table-striped">\
                        <thead>\
                            <tr>\
                            <th scope="col">#</th>\
                            <th scope="col">keys</th>\
                            <th scope="col">values</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
                html += '<tr>\
                            <th scope="row">1</th>\
                            <td>BRAND</td>\
                            <td>' + `${cpus.brand}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">2</th>\
                            <td>MANUFACTURER</td>\
                            <td>' + `${cpus.manufacturer}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">3</th>\
                            <td>VENDOR</td>\
                            <td>' + `${cpus.vendor}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">4</th>\
                            <td>PROCESSOR' + (cpus.processors > 1 ? "S" : "");
                            html += '</td>\
                            <td>' + `${cpus.processors}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">5</th>\
                            <td>CORES</td>\
                            <td>' + `${cpus.cores}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">6</th>\
                            <td>PERFORMANCE CORES</td>\
                            <td>' + `${cpus.performanceCores}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">7</th>\
                            <td>PHYSICAL CORES</td>\
                            <td>' + `${cpus.physicalCores}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">8</th>\
                            <td>EFFICIENT CORES</td>\
                            <td>' + `${cpus.efficiencyCores}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">9</th>\
                            <td>CORES SPEED</td>\
                            <td>' + `${cpus.speedMax}` + " Ghz" + '</td>'
                html += '</tr>';

    html += '</tbody>\
    </table>';
    newDiv.innerHTML = html;
});

systeminfos.disks().then((drives) => {
    //console.log(drives);

    var newDiv = document.createElement("div")
    newDiv.classList = "tab-pane fade"
    newDiv.id = "nav-disks"
    newDiv.role = "tabpanel"
    newDiv.tabindex = "0"
    tabs.insertAdjacentElement('afterBegin', newDiv);
    newDiv = document.getElementById('nav-disks');
    var html = '<table class="table table-striped">\
                        <thead>\
                            <tr>\
                            <th scope="col">#</th>\
                            <th scope="col">keys</th>\
                            <th scope="col">values</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
                for(var i = 0; i < drives.length; i++) {
                    html += '<tr>\
                                <th scope="row">' + `${drives[i].type}` + " " + `${i + 1}` + '</th>\
                                <td>MANUFACTURER</td>\
                                <td>' + `${drives[i].name}` + '</td>'
                    html += '</tr>';

                    html += '<tr>\
                                <th scope="row">1</th>\
                                <td>VENDOR</td>\
                                <td>' + `${drives[i].vendor}` + '</td>'
                    html += '</tr>';

                    html += '<tr>\
                                <th scope="row">2</th>\
                                <td>INTERFACE</td>\
                                <td>' + `${drives[i].interfaceType}` + '</td>'
                    html += '</tr>';

                    html += '<tr>\
                                <th scope="row">3</th>\
                                <td>TYPE</td>\
                                <td>' + `${drives[i].type}` + '</td>'
                    html += '</tr>';

                    html += '<tr>\
                                <th scope="row">4</th>\
                                <td>SMART STATUS</td>\
                                <td>' + `${drives[i].smartStatus}` + '</td>'
                    html += '</tr>';

                    html += '<tr>\
                                <th scope="row">5</th>\
                                <td>SIZE</td>\
                                <td>' + `${Math.round(drives[i].size / 1000 / 1000 / 1000)} GB` + '</td>'
                    html += '</tr>';
                }

    html += '</tbody>\
    </table>';
    newDiv.innerHTML = html;
});

systeminfos.system().then((sys) => {
    //console.log(sys);

    var newDiv = document.createElement("div")
    newDiv.classList = "tab-pane fade"
    newDiv.id = "nav-system"
    newDiv.role = "tabpanel"
    newDiv.tabindex = "0"
    tabs.insertAdjacentElement('afterBegin', newDiv);
    newDiv = document.getElementById('nav-system');
    var html = '<table class="table table-striped">\
                        <thead>\
                            <tr>\
                            <th scope="col">#</th>\
                            <th scope="col">keys</th>\
                            <th scope="col">values</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
                html += '<tr>\
                            <th scope="row">1</th>\
                            <td>DISTRIBUTION</td>\
                            <td>' + `${sys.distro}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">2</th>\
                            <td>ARCHITECTURE</td>\
                            <td>' + `${sys.arch}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">3</th>\
                            <td>FQDN</td>\
                            <td>' + `${sys.fqdn}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">4</th>\
                            <td>KERNEL</td>\
                            <td>' + `${sys.kernel}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">5</th>\
                            <td>UEFI</td>\
                            <td>' + `${sys.uefi}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">6</th>\
                            <td>PLATFORM</td>\
                            <td>' + `${sys.platform}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">7</th>\
                            <td>SERIAL</td>\
                            <td>' + `${sys.serial}` + '</td>'
                html += '</tr>';

    html += '</tbody>\
    </table>';
    newDiv.innerHTML = html;
})

systeminfos.graphics().then((graphics) => {
    //console.log(graphics.controllers);
    var graphics = graphics.controllers;

    var newDiv = document.createElement("div")
    newDiv.classList = "tab-pane fade"
    newDiv.id = "nav-graphics"
    newDiv.role = "tabpanel"
    newDiv.tabindex = "0"
    tabs.insertAdjacentElement('afterBegin', newDiv);
    newDiv = document.getElementById('nav-graphics');
    var html = '<table class="table table-striped">\
                        <thead>\
                            <tr>\
                            <th scope="col">#</th>\
                            <th scope="col">keys</th>\
                            <th scope="col">values</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
                for(var i = 0; i < graphics.length; i++) {
                    html += '<tr>\
                                <th scope="row">' + "GRAPHIC #" + (i + 1) + '</th>\
                                <td>MODEL</td>\
                                <td>' + `${graphics[i].model}` + '</td>'
                    html += '</tr>';

                    html += '<tr>\
                                <th scope="row">1</th>\
                                <td>' + `${(graphics[i].vramDynamic == false ? "DEDICATED " : "")}` + 'VRAM' + '</td>\
                                <td>' + `${graphics[i].vram}` + " MB" + '</td>'
                    html += '</tr>';

                    html += '<tr>\
                                <th scope="row">2</th>\
                                <td>DYNAMIC VRAM</td>\
                                <td>' + `${graphics[i].vramDynamic}` + '</td>'
                    html += '</tr>';
                    
                    if(graphics[i].driverVersion) {
                    html += '<tr>\
                                <th scope="row">3</th>\
                                <td>DRIVER VERSION</td>\
                                <td>' + `${graphics[i].driverVersion}` + '</td>'
                    html += '</tr>';
                    }
                    if(graphics[i].temperatureGpu) {
                    html += '<tr>\
                                <th scope="row">4</th>\
                                <td>TEMPERATURE</td>\
                                <td>' + `${graphics[i].temperatureGpu}` + "°" + '</td>'
                    html += '</tr>';
                    }
                }
    html += '</tbody>\
    </table>';
    newDiv.innerHTML = html;
})

systeminfos.battery().then((battery) => {
    //console.log(battery);
    var newDiv = document.createElement("div")
        newDiv.classList = "tab-pane fade"
        newDiv.id = "nav-battery"
        newDiv.role = "tabpanel"
        newDiv.tabindex = "0"
        tabs.insertAdjacentElement('afterBegin', newDiv);
    if(battery.hasBattery) {
        newDiv = document.getElementById('nav-battery');
        var html = '<table class="table table-striped">\
                        <thead>\
                            <tr>\
                            <th scope="col">#</th>\
                            <th scope="col">keys</th>\
                            <th scope="col">values</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
                html += '<tr>\
                            <th scope="row">1</th>\
                            <td>MODEL</td>\
                            <td>' + `${battery.model}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">2</th>\
                            <td>MANUFACTURER</td>\
                            <td>' + `${battery.manufacturer}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">3</th>\
                            <td>ORIGINAL CAPACITY</td>\
                            <td>' + `${battery.designedCapacity}` + " " + `${battery.capacityUnit}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">4</th>\
                            <td>CURRENT CAPACITY</td>\
                            <td>' + `${battery.maxCapacity}` + " " + `${battery.capacityUnit}` + '</td>'
                html += '</tr>';

                html += '<tr>\
                            <th scope="row">5</th>\
                            <td>REMAINING LIFETIME</td>\
                            <td>' + `${Math.round(100 - (battery.designedCapacity * 10) / battery.maxCapacity)}` + "/100" + '</td>'
                html += '</tr>';
        html += '</tbody>\
        </table>';
        newDiv.innerHTML = html;
    }
})

systeminfos.ram().then((ram) => {
    //console.log(ram);
    var newDiv = document.createElement("div")
    newDiv.classList = "tab-pane fade"
    newDiv.id = "nav-ram"
    newDiv.role = "tabpanel"
    newDiv.tabindex = "0"
    tabs.insertAdjacentElement('afterBegin', newDiv);
    newDiv = document.getElementById('nav-ram');
    var html = '<table class="table table-striped">\
                        <thead>\
                            <tr>\
                            <th scope="col">#</th>\
                            <th scope="col">keys</th>\
                            <th scope="col">values</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
                for(var i = 0; i < ram.length; i++) {
                    html += '<tr>\
                                <th scope="row">' + "SLOT #" + (i + 1) + '</th>\
                                <td>RAM BANK</td>\
                                <td>' + `${ram[i].bank}` + '</td>'
                    html += '</tr>';

                    html += '<tr>\
                                <th scope="row">1</th>\
                                <td>MANUFACTURER</td>\
                                <td>' + `${ram[i].manufacturer}` + '</td>'
                    html += '</tr>';

                    html += '<tr>\
                                <th scope="row">2</th>\
                                <td>PART NUMBER</td>\
                                <td>' + `${ram[i].partNum}` + '</td>'
                    html += '</tr>';

                    html += '<tr>\
                                <th scope="row">3</th>\
                                <td>RAM SIZE</td>\
                                <td>' + `${Math.round(ram[i].size / 1024 / 1024 / 1024)}` + " GB" + '</td>'
                    html += '</tr>';

                    html += '<tr>\
                                <th scope="row">4</th>\
                                <td>RAM TYPE</td>\
                                <td>' + `${ram[i].type}` + " " + `${ram[i].formFactor}` + '</td>'
                    html += '</tr>';

                    html += '<tr>\
                                <th scope="row">5</th>\
                                <td>CLOCK SPEED</td>\
                                <td>' + `${ram[i].clockSpeed}` + " Mhz" + '</td>'
                    html += '</tr>';
                }
    html += '</tbody>\
    </table>';
    newDiv.innerHTML = html;
})

systeminfos.networks().then((networks) => {
    console.log(networks);
    var newDiv = document.createElement("div")
    newDiv.classList = "tab-pane fade"
    newDiv.id = "nav-networks"
    newDiv.role = "tabpanel"
    newDiv.tabindex = "0"
    tabs.insertAdjacentElement('afterBegin', newDiv);
    newDiv = document.getElementById('nav-networks');
    var html = '<table class="table table-striped">\
                        <thead>\
                            <tr>\
                            <th scope="col">#</th>\
                            <th scope="col">keys</th>\
                            <th scope="col">values</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
                for(var i = 0; i < networks.length; i++) {
                    html += '<tr>\
                                <th scope="row">' + "INTERFACE #" + (i + 1) + '</th>\
                                <td>INTERFACE</td>\
                                <td>' + `${networks[i].iface}` + '</td>'
                    html += '</tr>';

                    html += '<tr>\
                                <th scope="row">1</th>\
                                <td>NAME</td>\
                                <td>' + `${networks[i].ifaceName}` + '</td>'
                    html += '</tr>';

                    html += '<tr>\
                                <th scope="row">2</th>\
                                <td>MAC</td>\
                                <td>' + `${networks[i].mac}` + '</td>'
                    html += '</tr>';

                    html += '<tr>\
                                <th scope="row">3</th>\
                                <td>TYPE</td>\
                                <td>' + `${networks[i].type}` + '</td>'
                    html += '</tr>';

                    if(networks[i].ip4) {
                    html += '<tr>\
                                <th scope="row">4</th>\
                                <td>IPv4</td>\
                                <td>' + `${networks[i].ip4}` + '</td>'
                    html += '</tr>';
                    }

                    if(networks[i].ip6) {
                        html += '<tr>\
                                    <th scope="row">5</th>\
                                    <td>IPv6</td>\
                                    <td>' + `${networks[i].ip6}` + '</td>'
                        html += '</tr>';
                        }
                }
    html += '</tbody>\
             </table>';
    newDiv.innerHTML = html;

})

function sleep(ms) {
    return new Promise((resolve) => setInterval(resolve, ms));
}
async function wait(ms) {
    await sleep(ms)
}

function doCpusAnalyze() {
    var loader = document.getElementById('cpus-result');
    loader.innerHTML = '<div class="loader"></div>';
    const buttons = document.querySelectorAll('button')
    buttons.forEach((input) => {
        input.classList.add("disabled");
    });
    setTimeout(function () {
        systeminfos.cpuScore().then((score) => {
            document.getElementById('cpus-result').innerHTML = "";
            document.getElementById('cpus-result').innerText = "Score: " + score;
        }) 
    }, 10000);
    buttons.forEach((input) => {
        input.classList.remove("disabled");
    });
}

document.getElementById('cpus-bench').addEventListener('click', function() {
    doCpusAnalyze()
})

function doNetworkDownloadAnalyze() {
    var loader = document.getElementById('networks-result');
    loader.innerHTML = '<div class="loader"></div>';
    const buttons = document.querySelectorAll('button')
    buttons.forEach((input) => {
        input.classList.add("disabled");
    });
    setTimeout(function () {
        document.getElementById('networks-result').innerHTML = "";
        systeminfos.uploadScore().then((score) => {
            document.getElementById('networks-result').innerText = "Download: " + score.mbps + " Mbps";
        })
        buttons.forEach((input) => {
            input.classList.remove("disabled");
        });
    }, 5000)
}

document.getElementById('networks-bench').addEventListener('click', function() {
    doNetworkDownloadAnalyze()
})

function doNetworkUploadAnalyze() {
    var loader = document.getElementById('networks-2-result');
    loader.innerHTML = '<div class="loader"></div>';
    const buttons = document.querySelectorAll('button')
    buttons.forEach((input) => {
        input.classList.add("disabled");
    });
    setTimeout(function () {
        document.getElementById('networks-2-result').innerHTML = "";
        systeminfos.downloadScore().then((sc) => {
            document.getElementById('networks-2-result').innerText = "Upload: " + sc.mbps + " Mbps";
        })
        buttons.forEach((input) => {
            input.classList.remove("disabled");
        });
    }, 2000)
}

document.getElementById('networks-2-bench').addEventListener('click', function() {
    doNetworkUploadAnalyze()
})

