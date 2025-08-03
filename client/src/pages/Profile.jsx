import React from "react";
import { useAuth } from "../AuthContext";
import Navbar from "../components/Navbar";

export default function Profile() {
    const { user } = useAuth();

    // Dummy data for about, profession, skills, etc.
    const about = "Passionate developer eager to connect and collaborate.";
    const profession = "Software Developer";
    const skills = ["React", "Node.js", "MongoDB", "JavaScript"];
    const location = "San Francisco, CA";
    const education = "B.Sc. in Computer Science, Stanford University";
    const experience = [
        {
            title: "Frontend Developer",
            company: "TechCorp",
            duration: "2022 - Present",
        },
        {
            title: "Intern",
            company: "WebStart",
            duration: "2021 - 2022",
        },
    ];
    const contact = "user@email.com";
    const website = "https://yourportfolio.com";

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <h3 className="mb-1">{user?.fullName}</h3>
                                    <p className="mb-0 text-muted">
                                        Profession: <span className="fw-semibold">{profession}</span>
                                    </p>
                                    <p className="mb-0 mt-2">
                                        <span className="fw-semibold">Location:</span> {location}
                                    </p>
                                    <p className="mb-0 mt-2">
                                        <span className="fw-semibold">Contact:</span> {contact}
                                    </p>
                                    <p className="mb-0 mt-2">
                                        <span className="fw-semibold">Website:</span>{" "}
                                        <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
                                    </p>
                                    <p className="mb-0 mt-2">
                                        <span className="fw-semibold">About:</span> {about}
                                    </p>
                                    <p className="mb-0 mt-2">
                                        <span className="fw-semibold">Skills:</span>{" "}
                                        {skills.join(", ")}
                                    </p>
                                    <div className="mt-3">
                                        <span className="fw-semibold">Experience:</span>
                                        <ul className="mb-0">
                                            {experience.map((exp, idx) => (
                                                <li key={idx}>
                                                    <span className="fw-semibold">{exp.title}</span> at {exp.company} ({exp.duration})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p className="mb-0 mt-2">
                                        <span className="fw-semibold">Education:</span> {education}
                                    </p>
                                </div>
                                <button className="btn btn-outline-primary ms-3" disabled>
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}