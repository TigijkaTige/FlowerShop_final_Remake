function Carusel() {
    return (
        <div className="text-center">
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="3000">
                        <img src="picture/car2.png" className="d-block mx-auto img-fluid" width="1200" height="400" alt="Доставляем на дом" />
                    </div>
                    <div className="carousel-item " data-bs-interval="2000">
                        <img src="picture/ikebana.jpg" className="d-block mx-auto img-fluid" width="1000" height="400" alt="Делаем икебаны на заказ" />
                    </div>
                    <div className="carousel-item" >
                        <img src="picture/merry.jpeg" className="d-block mx-auto img-fluid" width="1000" height="400" alt="оформление свадьбы" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Предыдущий</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Следующий</span>
                </button>
            </div>
        </div>

    );
}
export default Carusel;