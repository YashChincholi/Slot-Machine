let slot_screen = document.getElementById("slot-screen");
let reel = document.getElementsByClassName("reel");
let reels = document.getElementsByClassName("reels");
let stop_btn = document.getElementsByClassName("stop-btn");
let start_btn = document.getElementById("start-btn");

let sec = 100; //slot reel rotation speed in milliseconds
let stopReelFlag = []; //flag to stop reel rotation
let reelCounts = []; // which image to position
let slotFrameHeight; //height of the slot frame
let slotReelsHeight; //height of the slot reels
let slotReelItemsHeight; //height of the slot reel items
let slotReelStartHeight; //start height of the slot reel

//initialize the slot machine
let slot = {
  init: function () {
    stopReelFlag[0] = stopReelFlag[1] = stopReelFlag[2] = false;
    reelCounts[0] = reelCounts[1] = reelCounts[2] = 0;
  },

  //   click event
  start: function () {
    slot.init();
    for (let i = 0; i < 3; i++) {
      slot.animation(i);
    }
  },

  //   stop button click event
  stop: function (reelIndex) {
    stopReelFlag[reelIndex] = true;
    if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
      start_btn.removeAttribute("disabled");
    }
  },

  //   reset location of the reels
  resetlocationInfo: function () {
    slotFrameHeight = slot_screen.offsetHeight;
    slotReelsHeight = reels[0].offsetHeight;
    slotReelItemsHeight = reel[0].offsetHeight;
    slotReelStartHeight = -slotReelsHeight;
    slotReelStartHeight +=
      slotFrameHeight - slotFrameHeight / 2 + (slotReelItemsHeight * 3) / 2;
    for (let i = 0; i < reels.length; i++) {
      reel[i].style.top = String(slotReelStartHeight) + "px";
    }
  },

  //   animation
  animation: function (index) {
    if (reelCounts[index] >= 8) {
      reelCounts[index] = 0;
    }
    $(".reels")
      .eq(index)
      .animate(
        {
          top: -(slotReelItemsHeight * reelCounts[index]),
        },
        {
          duration: sec,
          easing: "linear",
          complete: function () {
            if (stopReelFlag[index]) {
              return;
            }
            reelCounts[index]++;
            slot.animation(index);
          },
        }
      );
  },
};

window.onload = function () {
  slot.resetlocationInfo();
  slot.init();

  //   start button click event
  start_btn.addEventListener("click", function (e) {
    e.target.setAttribute("disabled", "true");
    slot.start();
    for (let i = 0; i < stop_btn.length; i++) {
      stop_btn[i].removeAttribute("disabled");
    }
  });

  //   stop button click event
  for (let i = 0; i < stop_btn.length; i++) {
    stop_btn[i].addEventListener("click", function (e) {
      slot.stop(e.target.getAttribute("data-val"));
    });
  }
};
