import "./styles.css";
import useSWR from "swr";

//export default class App extends React.Component {

export default function Swr(temp) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const weatherAPI =
    "https://weather-proxy.freecodecamp.rocks/api/city/new%20york";

  // console.log("calling here ");
  // console.log(temp);
  debugger;
  this.temp = temp;

  const { data, error, isValidating } = useSWR(weatherAPI, fetcher);
  if (error) return <div>Error loading data</div>;
  if (isValidating || !data) return <div>Loading...</div>;
  return (
    <div className="container-fluid">
      <img
        className="pull-left"
        src={data.weather[0].icon}
        alt="Weather Stats"
      />
      <div>Temperature Stats</div>
      <br />
      <div>
        <span>Curent</span>{" "}
        <span>
          {temp
            ? Math.floor((data.main.temp * 9) / 5) + 32 + " °F"
            : data.main.temp + " °C"}{" "}
        </span>
      </div>
      <div>
        Feels Like{" "}
        <span>
          {this.temp
            ? Math.floor((data.main.feels_like * 9) / 5) + 32 + " °F"
            : data.main.feels_like + " °C"}
        </span>
      </div>

      <div>
        Min
        <span>
          {" "}
          {this.temp
            ? Math.floor((data.main.temp_min * 9) / 5) + 32 + " °F"
            : data.main.temp_min + " °C"}{" "}
        </span>
      </div>

      <div>
        Max
        <span>
          {" "}
          {this.temp
            ? Math.floor((data.main.temp_max * 9) / 5) + 32 + " °F"
            : data.main.temp_max + " °C"}{" "}
        </span>
      </div>
      <div></div>
      <br />
      <div>Humidity</div>
      <div>{data.main.humidity}</div>
      <div>Pressure</div>
      <div>{data.main.pressure}</div>
    </div>
  );
}
