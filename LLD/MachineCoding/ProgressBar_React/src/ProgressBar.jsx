const ProgressBar = ({ value = 0 }) => {
  return (
    <div className="progress">
      <div
        className="progress-fill"
        style={{
          width: `${value}%`,
          background: "linear-gradient(90deg, #1976d2, #42a5f5)",
          height: "100%",
          borderRadius: "20px",
          transition: "width 0.3s"
        }}
      ></div>
      <span>{value.toFixed()}%</span>
    </div>
  );
};
export default ProgressBar;