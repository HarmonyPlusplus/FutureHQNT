interface IListItem {
    id: number;
    name: string;
    sublinks?: Sublinks[];
    arrow?: string;
    icon?: string;
}

interface Sublinks {
    id: string;
    title: string;
    path: string;
    image?: string;
}

export const sidebarList: IListItem[] = [

    {
        id: 1,
        name: "Announcements",
        icon: undefined,

        sublinks: [
            { id: "General", title: "General Announcements", path: "/", image: undefined },
            { id: "Classroom", title: "Class Room Announcements", path: "/classroomAnnouncement", image: undefined },
        ]
    },
    {
        id: 2,
        name: "Classroom",
        icon: '/assets/classroom.png',
        arrow: '/assets/arrow.png',
        sublinks: [
            { id: "Course", title: "Course Outlines", path: "", image: undefined },
            { id: "ClassSchedule", title: "Class Schedule", path: "", image: undefined },
            { id: "Assignments", title: "Assignments", path: "", image: undefined },
            { id: "MyGrades", title: "My Grades", path: "", image: undefined },
            { id: "ClassResources", title: "Class Resources", path: "", image: undefined },
        ]
    },
    {
        id: 3,
        name: "Communities",
        icon: '/assets/community.png',
        arrow: '/assets/arrow.png',
        sublinks: [
            { id: "Future", title: "FutureLabs HQ", path: "", image: undefined },
            { id: "Design", title: "Design 2023", path: "", image: undefined },
        ]
    },
    {
        id: 4,
        name: "Create a Community",
        icon: '/assets/plus.png',
    },
    {
        id: 5,
        name: "Projects",
        icon: '/assets/project.png',
        arrow: '/assets/arrow.png',
        sublinks: [
            { id: "Project1", title: "Project Alpha", path: "", image: undefined },
            { id: "Project2", title: "Project Beta", path: "", image: undefined },
        ]
    },
    {
        id: 6,
        name: "Direct Messages",
        icon: '/assets/directmessage.png',
        arrow: '/assets/arrow.png',
        sublinks: [
            { id: "OliviaRhye1", image: '/assets/Avatar.png', title: "Olivia Rhye", path: "" },
            { id: "OliviaRhye2", image: '/assets/Avatar.png', title: "Olivia Rhye", path: "" },
            { id: "OliviaRhye3", image: '/assets/Avatar.png', title: "Olivia Rhye", path: "" },
        ]
    },

]