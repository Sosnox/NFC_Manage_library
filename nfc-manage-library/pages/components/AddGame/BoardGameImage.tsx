function BoardGameImage ({ imageURL }: { imageURL: any}){
    return (
        <div>
            <div className='flex shrink-0'>
                <img src={ imageURL } alt={ imageURL }/>  
            </div>
            <div>
                <span className='flex items-center justify-center mt-4'></span>
            </div>
        </div>

    );
}

export default BoardGameImage