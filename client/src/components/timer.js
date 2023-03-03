export const TimerClass = (props) => {
  const TIME_LIMIT = props.timeLeft;
  let timePassed = 0;
  let timeLeft = TIME_LIMIT;
  let timerInterval = null;

 
  
  startTimer();
  
  function onTimesUp() {
    clearInterval(timerInterval);
    document.getElementById("timer-class").style.display = 'none' 
    window.location.reload();
  }
  
  function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      console.log("timeLeft",timeLeft)
      if(timeLeft<1200){
        document.getElementById("timer-class").style.display = 'visible' 
        document.getElementById("base-timer-label").innerHTML = formatTime(
          timeLeft
        );
      }else{
     
        document.getElementById("timer-class").style.display = 'none' 
      }
   
    
    if (timeLeft<=0) {
        onTimesUp();
      }
    }, 1000);
  }
  
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60)
  
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
  
    return `${minutes}:${seconds}`;
  }
  



  return (

    <div id="timer-class" className="row  text-center py-2 " style={{ backgroundColor: '#c3dbf1' }}>
      <div className="col-4 "   >
     </div>
    <div className="col-sm-4 col-md-3 my-2 ">
    <div className="square">
    <span id="base-timer-label" className="base-timer__label">00:00</span>
</div>
        </div>
        <div className="col-4 "></div>
    </div>



  )
}