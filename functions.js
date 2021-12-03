/*
 * updateView() takes string @param 'choice' and adds hidden css class
 * to other time periods, then sets the choice as 'active' link
 */
function updateView (choice) {
  if (choice === 'daily') {
    document.querySelectorAll(".daily").forEach(element => { element.classList.remove("hidden") })
    document.querySelectorAll(".weekly,.monthly").forEach(element => { element.classList.add("hidden") })
    document.getElementById('daily').classList.add('active')
    document.getElementById('weekly').classList.remove('active')
    document.getElementById('monthly').classList.remove('active')
  }
  if (choice === 'weekly') {
    document.querySelectorAll(".weekly").forEach(element => { element.classList.remove("hidden") })
    document.querySelectorAll(".daily,.monthly").forEach(element => { element.classList.add("hidden") })
    document.getElementById('daily').classList.remove('active')
    document.getElementById('weekly').classList.add('active')
    document.getElementById('monthly').classList.remove('active')
  }
  if (choice === 'monthly') {
    document.querySelectorAll(".monthly").forEach(element => { element.classList.remove("hidden") })
    document.querySelectorAll(".daily,.weekly").forEach(element => { element.classList.add("hidden") })
    document.getElementById('daily').classList.remove('active')
    document.getElementById('weekly').classList.remove('active')
    document.getElementById('monthly').classList.add('active')
  }
}

/*
 * load() reads data from 'data.json' file and populates
 * index.html with all data
 */
function load () {
  let rawdata = new XMLHttpRequest()
  rawdata.open("GET", "data.json", true)
  rawdata.onreadystatechange = () => {
    if(rawdata.readyState === XMLHttpRequest.DONE) {
      if(rawdata.status === 200 || rawdata.status === 0) {
        data = JSON.parse(rawdata.responseText)
        data.map(item => {
          let divId = item.title.split(" ")[0].toLowerCase()
          document.getElementById(divId).querySelector(".current.daily").innerHTML = item.timeframes.daily.current + 'hrs'
          document.getElementById(divId).querySelector(".previous.daily").innerHTML = 'Yesterday - ' + item.timeframes.daily.previous + 'hrs'
          document.getElementById(divId).querySelector(".current.weekly").innerHTML = item.timeframes.weekly.current + 'hrs'
          document.getElementById(divId).querySelector(".previous.weekly").innerHTML = 'Last Week - ' + item.timeframes.weekly.previous + 'hrs'
          document.getElementById(divId).querySelector(".current.monthly").innerHTML = item.timeframes.monthly.current + 'hrs'
          document.getElementById(divId).querySelector(".previous.monthly").innerHTML = 'Last Month - ' + item.timeframes.monthly.previous + 'hrs'
        })
      }
    }
  }
  rawdata.send(null)
}

load() // load all data
updateView('weekly') // set initial view to 'weekly'