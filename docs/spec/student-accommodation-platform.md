
# Specification: Student Accommodation Platform (France)

## Problem Statement

Students in France face significant difficulties finding suitable "colocataire-style" (shared) accommodation. The process of finding landlords, verifying room availability, and communicating availability is fragmented and inefficient. Simultaneously, landlords with available rooms struggle to reach a targeted audience of students, often relying on outdated or inefficient methods.

## Solution

A centralized web application that connects students and landlords. The platform provides a searchable map interface where students can discover nearby accommodations based on their current or desired location. Landlords can easily list their properties, while students can initiate a streamlined, request-based booking process, all facilitated by a robust backend that handles spatial queries and reservation state management.

## User Stories

### For Students
1. As a student, I want to see a map of available accommodations in my target city, so that I can visually understand my housing options.
2. As a student, I can enter a specific address or location, so that I can find the 10 nearest available rooms to my university or workplace.
3. As a student, I want to view details about a specific room (address, number of available rooms), so that I can decide if it meets my needs.
4. As a student, I want to submit a booking request directly through the app, so that I don't have to find external contact methods.
5. As a student, I want to see the status of my booking requests (pending, approved, declined), so that I can manage my housing search effectively.
6. As a student, I want to create a profile with my contact information, so that landlords can reach me once they approve my request.
7. As a student, I want to be able to browse accommodation by city or department, so that I can plan my move to a new region.

### For Landlords
1. As a landlord, I want to create a listing with a specific address and number of available rooms, so that students know what is available.
2. As a landlord, I want to receive notifications when a student submits a booking request, so that I can respond promptly.
3. As a landlord, I want to approve or decline incoming booking requests, so that I can maintain control over who occupies my property.
4. As a landlord, I want to manage my existing listings, so that I can update availability as rooms are filled.
5. As a landlord, I want to view a list of students who have requested my rooms, so that I can review their profiles before approving.

### For System Administrators / Platform
1. As a platform administrator, I want the system to handle spatial queries efficiently using PostGIS, so that the "top 10 nearest" feature remains performant even as the number of listings grows.
2. As a platform administrator, I want the system to use Supabase Auth, so that user identity and security are handled by a robust, industry-standard provider.
3. As a platform administrator, I want the frontend and backend to be deployed on Vercel, so that the application is highly available and scales automatically.

## Implementation Decisions

### Architecture
*   **Frontend**: Next.js application serving as the primary user interface and handling client-side routing and Authentication integration.
*   **Backend**: A Python FastAPI service acting as the core business logic engine, responsible for complex operations like spatial calculations and booking state transitions.
*   **Communication**: Next.js will interact with the FastAPI backend via RESTful API endpoints.
*   **Database**: Supabase (PostgreSQL) will serve as the single source of truth, utilizing the **PostGIS** extension for all proximity-based logic.

### Data Model & Schema
*   **Users**: Managed via Supabase Auth, with extended profile metadata stored in a `profiles` table.
*   **Accommodations**: A table containing `address`, `latitude`, `longitude`, `available_rooms`, and `landlord_id`.
*   **Bookings**: A table tracking the relationship between `student_id`, `accommodation_id`, `status` (pending, approved, declined), and `request_timestamp`.
*   **Spatial Indexing**: Use of GIST indexes on the geometry/geography columns in PostgreSQL to optimize `ST_D3` and `ST_Distance` queries.

### API Contracts
*   **GET `/search`**: Accepts latitude/longitude and returns the top 10 nearest accommodations.
*   **POST `/bookings`**: Accepts `accommodation_id` and `student_id`, creating a new 'pending' booking record.
*   **PATCH `/bookings/{id}`**: Allows landlords to update status to 'approved' or 'declined'.

## Testing Decisions

*   **Integration Testing**: Focus on the "seam" between the Next.js frontend and the FastAPI backend. We will test that the Next.js API routes correctly proxy requests to FastAPI and that the responses are correctly parsed.
*   **Backend Logic Testing**: Unit tests for the FastAPI service, specifically focusing on the spatial query logic (ensuring the PostGIS queries return the expected 10 results) and the booking state machine (ensuring a declined request cannot be later approved).
*   **Database Testing**: Integration tests against a real Supabase/PostgreSQL instance (or a local Dockerized Postgres with PostGIS) to verify that spatial queries and triggers work as expected.
*   **End-to-End (E2E) Testing**: High-level tests of the booking flow: Student searches -> Student clicks book -> Landlord views request -> Landlord approves.

## Out of Scope

*   Real-time chat messaging between students and landlords (this will be a future phase).
*   Payment processing or automated rent collection.
*   Complex identity verification (e.g., uploading ID documents) for students.
*   Integration with external property management software.

## Further Notes

The initial deployment will focus on a "city-level" approach to simplify the data entry process for landlords, but the database schema is designed to support precise geocoding as the platform matures.
