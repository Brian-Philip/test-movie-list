import { Entity, Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Movie } from './movie.entity';

@Entity({ name: 'studio' })
export class Studio {
  @PrimaryGeneratedColumn({ name: 'cd_studio' })
  cdStudio: number;

  @Column('varchar', { name: 'nm_studio' })
  nmStudio: string;

  @ManyToMany(() => Movie, movie => movie.studios)
  movies: Movie[];
}
