interface CompatibleWithStravaProps {
  color: 'white' | 'light' | 'gray';
  stack: boolean;
  height?: number;
  width?: number;
}

export function CompatibleWithStrava(props: CompatibleWithStravaProps) {
  return (
    <div>
      <a href="https://strava.com">
        <img
          alt="authorize"
          src={`/api_logo_pwrdBy_strava_${props.stack ? 'stack' : 'horiz'}_${props.color}.png`}
          width={props.width}
          height={props.height}
        />
      </a>
    </div>
  );
}
