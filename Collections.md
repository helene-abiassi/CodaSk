User collection:

first name: string
last name: string
password: string
user_photo:string
email: string
bio: string
Location: {
city
country}
course_type: string
Course date: date
cohort_name: string
user_permission:{
student
graduate
mentor}
website: string
github: string
member_since: date
last_seen: date
questions: [objectID]
answers:[objectID]
saved_tags:[objectID]

QUESTIONS
author: objectID (from users collection)
posted_on: date
title: string
problem_description: string
solution_tried: string
github_repo: string
tags: [string]
answers: [objectID] (from answers collection)
votes: [objectID] (from users collection)
status: [string]

ANSWERS
author: objectID (from users collection)
posted_on: date
message: string
question: ObjectID (from questions collection)
