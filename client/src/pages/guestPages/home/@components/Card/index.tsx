import './style.scss';

interface CardType {
  title: string;
  location: string;
  email: string;
  gender: string;
  image: string;
}

const Card = ({ title, location, email, gender, image }: CardType) => (
  <section className='card'>
    <img className='cardImage' src={image} alt={title} />
    <div className='cardContent'>
      <h3 className='cardTitle'>{title}</h3>
      <span className='cardLocation'>{location}</span>
      <div className='cardContact'>
        <span className='cardMail'>{`email: ${email}`}</span>
        <span className='cardGender'>{`gender: ${gender}`}</span>
      </div>
    </div>
  </section>
);

export default Card;
