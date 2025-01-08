import { Entity, Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Movie } from './movie.entity';

@Entity({ name: 'producer' })
export class Producer {
  @PrimaryGeneratedColumn({ name: 'cd_producer' })
  cdProducer: number;

  @Column('varchar', { name: 'nm_producer' })
  nmProducer: string;

  @ManyToMany(() => Movie, movie => movie.producers)
  movies: Movie[];
}
