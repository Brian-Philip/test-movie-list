import { Entity, Column, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { Producer } from './producer.entity';
import { Studio } from './studio.entity';

@Entity({ name: 'movie' })
export class Movie {
  @PrimaryGeneratedColumn({ name: 'cd_movie' })
  cdMovie: number;

  @Column('varchar', { name: 'nm_movie' })
  nmMovie: string;

  @Column('int', { name: 'vl_year' })
  vlYear: number;

  @Column({ name: 'tp_winner', type: 'varchar', length: 1, nullable: false, default: 'N' })
  tpWinner: string;

  @ManyToMany(() => Producer, producer => producer.movies)
  @JoinTable()
  producers: Producer[];

  @ManyToMany(() => Studio, studio => studio.movies)
  @JoinTable()
  studios: Studio[];
}