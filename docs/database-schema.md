Task
- Id (auto incremented) 
- Name
- Content
- StartDate
- EndDate
- Status
- ActivityId
`e.g. New, In Progress, Done, Cancelled` 

Status
- Id (auto incremented) 
- Title/Name
- Style/Theme
 
`e.g. '#sport' '#course' '#work' '#hobby'`
Tag
- Id (auto incremented) 
- Name
- Color/Theme
 
Activity
- Id (auto incremented) 
- Title/Name
- Description
- Url (optional) -> e.g. link to hobby/course page 
- StartDate (optional)
- EndDate (optional)
- Status
- ActivityType
 
`e.g. Hobby, School, Job, Other`
ActivityType
- Id (auto incremented) 
- Name


ActivityTag Table
- ActivityId (Foreign Key referencing Activity.Id)
- TagId (Foreign Key referencing Tag.Id)
- Primary Key: (ActivityId, TagId)

TaskTag Table
- TaskId (Foreign Key referencing Task.Id)
- TagId (Foreign Key referencing Tag.Id)
- Primary Key: (TaskId, TagId)

