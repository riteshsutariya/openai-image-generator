export default function ImageContainer(props) {
    return (
        <>
            <div className="image-container">
                {console.log('image source: ', props.imageSrc)}
                <img src={props.imageSrc} alt="generated_image" />
            </div>
        </>
    )
}