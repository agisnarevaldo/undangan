'use client'

export default function GallerySection() {
    return (
        <section className="bg-white dark:bg-black pb-5 pt-3" id="gallery">
            <div className="mx-auto px-4">
                <div className="border border-gray-300 dark:border-gray-600 rounded-3xl shadow p-3 bg-white dark:bg-gray-800">
                    <h2 className="font-esthetic text-center py-2 m-0 text-[2.25rem] text-gray-900 dark:text-gray-100">Galeri</h2>

                    {/* Carousel 1 */}
                    <div id="carousel-image-one" className="carousel slide mt-4" data-bs-ride="carousel" data-bs-interval="2000" suppressHydrationWarning>
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carousel-image-one" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carousel-image-one" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carousel-image-one" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner rounded-2xl">
                            <div className="carousel-item active">
                                <img src="https://picsum.photos/1280/720?random=1" alt="image 1" className="block w-full cursor-pointer" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://picsum.photos/1280/720?random=2" alt="image 2" className="block w-full cursor-pointer" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://picsum.photos/1280/720?random=3" alt="image 3" className="block w-full cursor-pointer" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carousel-image-one" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carousel-image-one" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                    {/* Carousel 2 */}
                    <div id="carousel-image-two" className="carousel slide mt-4" data-bs-ride="carousel" data-bs-interval="5000" suppressHydrationWarning>
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carousel-image-two" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carousel-image-two" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carousel-image-two" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner rounded-2xl">
                            <div className="carousel-item active">
                                <img src="https://picsum.photos/1280/720?random=4" alt="image 4" className="block w-full cursor-pointer" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://picsum.photos/1280/720?random=5" alt="image 5" className="block w-full cursor-pointer" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://picsum.photos/1280/720?random=6" alt="image 6" className="block w-full cursor-pointer" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carousel-image-two" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carousel-image-two" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
