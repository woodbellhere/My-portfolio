'use strict';

// 锻炼数据类
class Workout {
  date = new Date();
  id = (Date() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    // this.coords = coords; [lat, lng]
    this.coords = coords;
    this.distance = distance; //km
    this.duration = duration; //min
  }

  setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // 注意奥，workout里是没type，所以在各个子类里跑就行
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this.setDescription();
  }

  calcPace() {
    // min /km
    this.pace = this.duration / this.distance;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    // this.type = 'cycling'
    this.calcSpeed();
    this.setDescription();
  }

  calcSpeed() {
    // kn /h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

// 应用架构

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// app主要功能类
class App {
  // 地图和地图事件私有数据
  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  // 锻炼记录数据
  #workouts = [];

  // 一创建就获取位置，做好表单和输入上的监听
  constructor() {
    // 获取位置
    this.#getPosition();
    // 加载保存数据
    this.#getLocalStorage();
    // 进行相应事件监听
    form.addEventListener('submit', this.#newWorkout.bind(this));
    inputType.addEventListener('change', this.#toggleElevationField);
    containerWorkouts.addEventListener('click', this.#moveToPopup.bind(this));
  }

  // 这里其实主要是geolocation api
  #getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // 这里的get位置其实也是正常的函数调用，this也要手动绑定
        this.#loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
    }
  }

  // 把geolocation得到的经纬度输入leaflet的地图库
  // 大致上leaflet是首先确定位置和聚焦程度，再逐层贴地图层，最后自己有一套单独的事件监听
  #loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];
    // 第二个参数是聚焦程度，越大越聚焦
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    // 加图层
    L.tileLayer(
      // 这里是高德瓦片地图
      'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      // https://${s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png
      {
        attribution:
          '&copy; <a href="https://ditu.amap.com/">高德瓦片地图</a> contributors',
      }
    ).addTo(this.#map);

    // 地图事件
    this.#map.on('click', this.#showForm.bind(this));

    this.#workouts.forEach(work => {
      this.#renderWorkoutMarker(work);
    });
  }

  // 单击地图时记录位置，也显示表单
  #showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  // 新输入数据原地替换输入栏
  #hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  // 切换不同锻炼类型的表单样式
  #toggleElevationField() {
    // 选择不同锻炼类型时，input栏也相应更改
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  // 为新的表单输入做准备
  #newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(input => Number.isFinite(input));

    const allPositive = (...inputs) => inputs.every(input => input > 0);

    e.preventDefault();

    // 从表单以及地图事件中获取数据
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    // 判断锻炼类型并新建相应数据
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // 校验数据有效性
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // 在锻炼数组中新增对象
    this.#workouts.push(workout);

    // 在地图上渲染锻炼地点为一个标记
    this.#renderWorkoutMarker(workout);

    // 地图点击地点的样式

    // 在页面左边的数据栏中渲染锻炼数据
    this.#renderWorkout(workout);

    //隐藏表单并清除输入栏
    this.#hideForm();

    // 在local storage中储存
    this.#setLocalStorage();
  }

  #renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  #renderWorkout(workout) {
    let html = `<li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
    <h2 class="workout__title">Running on April 14</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>
    `;

    if (workout.type === 'running')
      html += `<div class="workout__details">
           <span class="workout__icon">⚡️</span>
           <span class="workout__value">${workout.pace.toFixed(1)}</span>
           <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
           <span class="workout__icon">🦶🏼</span>
           <span class="workout__value">${workout.cadence}</span>
           <span class="workout__unit">spm</span>
         </div>
         </li>
         `;

    if (workout.type === 'cycling')
      html += `
    <div class="workout__details">
    <span class="workout__icon">⚡️</span>
    <span class="workout__value">${workout.speed.toFixed(1)}</span>
    <span class="workout__unit">km/h</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⛰</span>
    <span class="workout__value">${workout.elevationGain}</span>
    <span class="workout__unit">m</span>
  </div>
 </li>
 `;

    form.insertAdjacentHTML('afterend', html);
  }

  #moveToPopup(e) {
    if (!this.#map) return;
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // workout.click();
  }

  #setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  #getLocalStorage() {
    const saveData = JSON.parse(localStorage.getItem('workouts'));

    if (!saveData) return;
    this.#workouts = saveData;

    this.#workouts.forEach(work => {
      this.#renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();

// let url = `https://restapi.amap.com/v3/geocode/regeo?output=xml&location=${longitude},${latitude}&key=fd1d48246947c02503b58eb0a13db873&radius=1000&extensions=all`;
// console.log(latitude, longitude);
// fetch(url)
//   .then(response => response.text()) // 或者 response.json() 如果服务器返回的是JSON
//   .then(data => console.log(data)) // 在这里处理你的数据
//   .catch(error => {
//     console.error('Error:', error);
//   })
