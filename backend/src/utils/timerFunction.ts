export default function runAtSpecificTimeOfDay(hour, minutes, func)
{
  const twentyFourHours = 24*60*60*1000;
  const now:any = new Date();
  let eta_ms = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minutes, 0, 0).getTime() - now;
  if (eta_ms < 0)
  {
    eta_ms += twentyFourHours;
  }
  func()
  setTimeout(()  => {
    // run every 24 hours from now on
    setInterval(func, twentyFourHours);
  }, eta_ms);
}