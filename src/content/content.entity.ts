import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContentCreateVo } from './vo/content-create.vo';
import { Member } from '../member/member.entity';

@Entity('contents')
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  link: string;

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Member, (member) => member.contents, { nullable: false })
  @JoinColumn({ name: 'member_id' })
  member: Member;

  static from(vo: ContentCreateVo) {
    const contentEntity = new Content();
    contentEntity.title = vo.title;
    contentEntity.category = vo.category;
    contentEntity.link = vo.link;
    contentEntity.createdAt = vo.createdAt;
    contentEntity.updatedAt = vo.updatedAt;
    contentEntity.member = vo.member;
    return contentEntity;
  }
}
