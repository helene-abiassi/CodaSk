export interface User extends UserPhoto {
    first_name: string;
    last_name: string;
    email: string;
    password:string;
    user_photo: string;
    bio: string;
    location: {
      city: string;
      country: string;
    };
    course_type: string;
    course_date: Date | string;
    cohort_name: string;
    user_permission: string;
    website: string;
    github: string;
    member_since: Date | string;
    last_seen: Date | string;
    questions: Questions[];
    answers: [];
    saved_tags: [];
  }
  export interface UserPhoto {
    user_photo: string;
  }

  export interface Questions {
    author:{
        first_name:string;
        last_name:string;
        bio:string;
        member_since:Date;
        user_photo:string;
        course_type:string;
    };
    posted_on: Date;
    title:string;
    problem_description:string;
    solution_tried:string;
    module:string;
    github_repo:string;
    tags: Tags[] ;
    answers: Answers[];
    saved_by:[];
    status:string;
  }

  export interface Tags{
name:string;
description:string;
related_questions: Questions[];
  }

  export interface Answers{
    author:{
        first_name:string;
        last_name:string;
        member_since:Date;
        user_photo:string;
        course_type:string;
    };
    posted_on: Date;
    message:string;
    question: Questions;
    votes: User[];

  }