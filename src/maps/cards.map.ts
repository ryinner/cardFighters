import doctorImage from '../assets/doctor.png';
import knightImage from '../assets/knight.jpg';
import { Card } from '../types/cards.type';

export default <Card[]>[
    { id: 1, name: 'Knight', type: 'warrior', description: 'the best warrior in the kingdom', image: knightImage, coast: 2, healthPoints: 5, damage: 2 },
    { id: 2, name: 'Doctor', type: 'healer', description: 'the best healer in the kingdom', image: doctorImage, coast: 3, healthPoints: 2, healPoints: 3 }
];
