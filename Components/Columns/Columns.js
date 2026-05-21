export const Columns = ({ isStackedOnMobile, children, textColor, backgroundColor }) => {
    const textColorStyle = textColor ? { color: textColor } : {};
    const backgroundColorStyle = backgroundColor ? { background: backgroundColor } : {};
    return (
        <div className="my-10" style={{ ...textColorStyle, ...backgroundColorStyle }}>
            <div
                className={`max-w-5xl mx-auto items-start gap-8 ${
                    isStackedOnMobile ? "block md:flex" : "flex"
                }`}
            >
                {children}
            </div>
        </div>
    );
};